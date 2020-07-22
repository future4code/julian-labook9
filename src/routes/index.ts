import {Router} from 'express';
import { signUpEndpoint } from '../endpoints/signUp';
import { loginEndpoint } from '../endpoints/login';
import { addFriendEndpoint } from '../endpoints/addFriend';
import { undoFriendshipEndpoint } from '../endpoints/undoFriendship';

export const routes = Router();

routes.post("/signup", signUpEndpoint);
routes.post("/login", loginEndpoint);
routes.post("/add-friend", addFriendEndpoint);
routes.post("/undo-friendship", undoFriendshipEndpoint);