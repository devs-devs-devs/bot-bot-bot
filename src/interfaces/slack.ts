export interface SlackEvent {
    type: string,
    username?: string,
    user?:string,
    text: string,
    ts?: string;
    channel: string;
    event_ts?: string;
    message?: any;
    subtype?: string;
}

export interface SlackMessage {
    token: string;
    challenge?: string;
    team_id?: string;
    api_app_id?: string;
    event?: SlackEvent;
    type?: string;
    event_id?: string;
    event_time?: number;
    authed_users?: string[];
}

export interface SlackMember {
    id: string;
    team_id: string;
    name: string;
    deleted: boolean;
    color?: string;
    real_name: string;
    tz?: any;
    tz_label: string;
    tz_offset: number;
    profile: SlackProfile;
    is_admin:boolean;
    is_owner:boolean;
    is_primary_owner:boolean;
    is_restricted:boolean;
    is_ultra_restricted:boolean;
    is_bot:false;
    updated:number;
    is_app_user:boolean;
}

export interface SlackProfile {
    first_name:string;
    last_name:string;
    image_24:string;
    image_32:string;
    image_48:string;
    image_72:string;
    image_192:string;
    image_512:string;
    avatar_hash:string;
    always_active:boolean;
    display_name:string;
    real_name:string;
    real_name_normalized:string;
    display_name_normalized:string;
    fields:any;
    team:string;
}
