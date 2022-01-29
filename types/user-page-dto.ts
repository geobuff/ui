import { UserDto } from "./user-dto";

export interface UserPageDto {
  users: UserDto[];
  hasMore: boolean;
}
