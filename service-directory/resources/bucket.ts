import {ComponentResource, ComponentResourceOptions, getStack} from "@pulumi/pulumi";
import { s3 } from "@pulumi/aws";

// Note
// Pulumi has Clasic and Native packages
// Classic has everything in terraform and Native only has what is written for pulumi
// If pulumi doesn't have the same doc, go to terraform doc
// Use classic until native has more things

// create an interface for the bucket so devs to pass in the 
// minimal required parameters to create a bucket
// this is the domain specific language for creating the bucket
// so developers don't directly create the bucket
type FMBucketArgs = {
    Name: string;
    Product: string;
};

// opinionated component for creating the resources
// opts are pulumi options and passed to every component
export class FMBucket extends ComponentResource {
    constructor(args: FMBucketArgs, opts?: ComponentResourceOptions) {
        const resourceName = `${args.Product}-${args.Name}`;

        super("pkg:index:FMBucket", resourceName, {}, opts);

        const stack = getStack();

        const bucketName = `${resourceName}-${stack}`;


        const bucket = new s3.Bucket(args.Name, {
            acl: "private",
            bucket: bucketName,
            tags: {
                Environment: stack,
            },
        
        }, {parent: this});

        new s3.BucketPublicAccessBlock(args.Name, {
            bucket: bucket.id,
            blockPublicAcls: true,
            blockPublicPolicy: true,
            ignorePublicAcls: true,
            restrictPublicBuckets: true,
        }, {parent: this});
    }
}