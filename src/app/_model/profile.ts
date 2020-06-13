import { Badge } from './badge';

export class Profile{
    uniqueId: string;
    name: string;
    figureString: string;
    motto: string;
    memberSince: string;
    profileVisible: boolean;
    selectedBadges: Badge[];
}

