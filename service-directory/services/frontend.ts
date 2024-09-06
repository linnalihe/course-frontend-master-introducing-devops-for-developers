import { ComponentResource, CustomResourceOptions, getStack } from "@pulumi/pulumi";
import { FMBucket } from "../resources/bucket";

type FmFrontEndArgs = {
    Name: string;
    Product: string;
};

export class FmFrontend extends ComponentResource {
    constructor(args: FmFrontEndArgs, opts?: CustomResourceOptions) {
        const resourceName = `${args.Product}-${args.Name}`;

        super("pkg:index:FmFrontend", resourceName, {}, opts);

        const source = new FMBucket({
            Name: args.Name,
            Product: args.Product,
        }, 
        { parent: this } 
        // this means FMBucket is parented by FmFrontEndArgs 
        // but everything in FMBucket has own resources
        );

        const replica = new FMBucket({
            Name: `${args.Name}-replica`,
            Product: args.Product,
        }, 
        { parent: this } 
        // this means FMBucket is parented by FmFrontEndArgs 
        // but everything in FMBucket has own resources
        );
    }
}