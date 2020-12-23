import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class SubmitVoteDto {
  @IsNotEmpty()
  votes: {
    userId: number,
    ranking: number
  }[];
}
