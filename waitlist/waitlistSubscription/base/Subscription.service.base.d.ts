import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, Subscription } from "@prisma/client";
export declare class SubscriptionServiceBase {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    count<T extends Prisma.SubscriptionCountArgs>(args: Prisma.SelectSubset<T, Prisma.SubscriptionCountArgs>): Promise<number>;
    findMany<T extends Prisma.SubscriptionFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.SubscriptionFindManyArgs>): Promise<Subscription[]>;
    findOne<T extends Prisma.SubscriptionFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.SubscriptionFindUniqueArgs>): Promise<Subscription | null>;
    create<T extends Prisma.SubscriptionCreateArgs>(args: Prisma.SelectSubset<T, Prisma.SubscriptionCreateArgs>): Promise<Subscription>;
    update<T extends Prisma.SubscriptionUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.SubscriptionUpdateArgs>): Promise<Subscription>;
    delete<T extends Prisma.SubscriptionDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.SubscriptionDeleteArgs>): Promise<Subscription>;
}
