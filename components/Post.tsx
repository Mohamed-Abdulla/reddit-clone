import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatBubbleBottomCenterTextIcon,
  EllipsisHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Timeago from "react-timeago";
import Link from "next/link";
import { Jelly } from "@uiball/loaders";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_VOTES_BY_POST_ID } from "../graphql/queries";
import { ADD_VOTE } from "../graphql/mutations";

type Props = {
  post: Post;
};

const Post = ({ post }: Props) => {
  const { data: session } = useSession();
  const [vote, setVote] = useState<boolean>(undefined);

  const { data, loading } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  });

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, "getVotesByPostId"],
  });

  useEffect(() => {
    const voteList: Vote[] = data?.getVotesByPostId;
    //Latest vote (as we sorted by newly created first in SQL query!)
    //Note: You could improve this by moving it to the original Query

    //checking we vote this post or not, it returns true or false

    const vote = voteList?.find((vote) => vote.username == session?.user?.name)?.upvote;
    //if we did, set vote to state
    setVote(vote);
  }, [data]);

  const upVote = async (isUpvote: boolean) => {
    if (!session) {
      toast("❗You'll need to sign in to Vote!");
      return;
    }
    //checking if we voted already and try adding again - return
    if (vote && isUpvote) return;
    if (vote === false && !isUpvote) return;

    console.log("voting...", isUpvote);

    //now vote
    await addVote({
      variables: {
        post_id: post?.id,
        username: session?.user?.name,
        upvote: isUpvote,
      },
    });
  };

  const displayVotes = (data: any) => {
    const voteList: Vote[] = data?.getVotesByPostId;

    const displayNumber = voteList?.reduce((total, vote) => (vote?.upvote ? (total += 1) : (total -= 1)), 0);
    if (voteList?.length === 0) return;

    //if no one is voted,if last vote we made is true, show 1 else -1.

    if (displayNumber === 0) {
      return voteList[0]?.upvote ? 1 : -1;
    }
    return displayNumber;
  };

  if (!post)
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#FF4501" />
      </div>
    );

  return (
    <Link href={`/post/${post.id}`}>
      <div
        className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm
    hover:border  hover:border-gray-600"
      >
        {/* votes */}
        <div
          className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400
      "
        >
          <ArrowUpIcon
            className={`voteButtons hover:text-red-400 ${vote === true && "text-red-400"}`}
            onClick={() => upVote(true)}
          />
          <p className={`text-black  text-xs font-bold `}>{displayVotes(data)}</p>
          <ArrowDownIcon
            className={`voteButtons hover:text-blue-400 ${vote === false && "text-blue-400"}`}
            onClick={() => upVote(false)}
          />
        </div>

        <div className="p-3 pb-1 ">
          {/* header */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subreddit?.topic} />
            <p className="text-xs text-gray-400 ">
              <Link href={`/subreddit/${post.subreddit.topic}`}>
                <span className="font-bold  text-black hover:text-blue-400 hover:underline mr-1">
                  r/{post.subreddit.topic}
                </span>
              </Link>
              • Posted by u/{post.username} • <Timeago date={post.created_at} />
            </p>
          </div>

          {/* body */}
          <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>

          {/* image */}
          <img className="w-full" src={post.image} alt="" />
          {/* footer */}

          <div className="flex space-x-4 text-gray-400 p-2">
            <div className="postButtons">
              <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
              <p className="">{post.commentList.length} Comments</p>
            </div>
            <div className="postButtons">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Award</p>
            </div>
            <div className="postButtons">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="postButtons">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
            <div className="postButtons">
              <EllipsisHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
