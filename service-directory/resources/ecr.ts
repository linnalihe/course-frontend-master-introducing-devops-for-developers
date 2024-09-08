import {ComponentResource, ComponentResourceOptions} from "@pulumi/pulumi";
import { ecr } from "@pulumi/aws";




type FMEcrArgs = {
    Name: string;
    Product: string;
};


export class FMEcr extends ComponentResource {
    constructor(args: FMEcrArgs, opts?: ComponentResourceOptions) {
        const resourceName = `${args.Product}-${args.Name}`;

        super("pkg:index:FMEcr", resourceName, {}, opts);


        new ecr.Repository(args.Name, {
            name: resourceName,
            imageTagMutability: "MUTABLE",
            imageScanningConfiguration: {
                scanOnPush: false,
            },
        }, {parent: this});


    }
}