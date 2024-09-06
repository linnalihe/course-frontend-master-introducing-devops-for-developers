import { FMBucket } from "./resources/bucket"
import { FmFrontend } from "./services/frontend"

function main() {

    new FmFrontend({
        Name: 'example',
        Product: 'devops-course'
    })

}

main()

