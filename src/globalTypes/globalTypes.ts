export interface User {
  id: number;
  cohortStartDate: string;
  username: string;

  authorities: [];
  enabled: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
}

export interface Assignment {
  [key: string]: number | string;
  id: number;
  status: string;
  githubUrl: string;
  branch: string;
  codeReviewVideoUrl: string;
}
