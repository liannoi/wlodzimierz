import {environment} from '../../../../environments/environment';

const BaseAddress = environment.api_url;
const Controller = `${BaseAddress}/Conversations`;

const conversationsEndpoints: ConversationsEndpoints = {};

// tslint:disable-next-line:no-empty-interface
interface ConversationsEndpoints {
}

export const ConversationsController: string = Controller;
export const ConversationsEndpoints: ConversationsEndpoints = conversationsEndpoints;
