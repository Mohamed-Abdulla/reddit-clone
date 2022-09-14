import { gql } from "@apollo/client";

// here, what we are doing is we create a mutation with a defined datatype,then call the
// mehtod we want (Insert Post) here,we mapping the field and pass our type and it matches that and return
//what data we want

export const ADD_POST = gql`
  mutation MyMutaion($body: String!, $image: String!, $subreddit_id: ID!, $title: String!, $username: String!) {
    insertPost(body: $body, image: $image, subreddit_id: $subreddit_id, title: $title, username: $username) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
    }
  }
`;

export const ADD_SUBREDDIT = gql`
  mutation MyMutaion($topic: String!) {
    insertSubreddit(topic: $topic) {
      created_at
      id
      topic
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation MyMutaion($post_id: ID!, $username: String!, $text: String!) {
    insertComment(post_id: $post_id, username: $username, text: $text) {
      id
      text
      post_id
      username
    }
  }
`;

export const ADD_VOTE = gql`
  mutation MyMutaion($post_id: ID!, $username: String!, $upvote: Boolean!) {
    insertVote(post_id: $post_id, username: $username, upvote: $upvote) {
      id
      created_at
      upvote
      post_id
      username
    }
  }
`;
