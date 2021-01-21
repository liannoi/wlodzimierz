import {environment} from '../../../../environments/environment';

const BaseAddress = environment.api_url;
const Controller = `${BaseAddress}/Conversations`;

const conversationsEndpoints: ConversationsEndpoints = {
  Messages: `${Controller}/conversation-messages`,
};

interface ConversationsEndpoints {
  readonly Messages: string;
}

export const ConversationsController: string = Controller;
export const ConversationsEndpoints: ConversationsEndpoints = conversationsEndpoints;
