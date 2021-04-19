export type FeedbackCreate = {
  type: string;
  user: string;
  account: string;
  route: string;
  timestamp: string;
  browser: string;
  viewport: string;
};

export type FeedbackResponse = {
  SuccessfullyPosted: boolean;
};
