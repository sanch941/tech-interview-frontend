export interface TelegramBotUsage {
    id: number;
    usageCount: number;
    username: string;
    channelName: string | null;
    usageType: TelegramBotUsageType;
    usageTypeAsString: string;
    createdAt: string;
    updatedAt: string;
}

export enum TelegramBotUsageType {
    Undefined = 0,
    DirectMessage = 1,
    GroupMention = 2,
    SupergroupMention = 3,
    InlineQuery = 4,
}
