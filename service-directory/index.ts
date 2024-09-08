import { FmFrontend } from "./services/frontend"
import { FmBackend } from "./services/backend"

function main() {

    new FmBackend({
        Name: 'example',
        Product: 'linna-devops-course'
    })

    new FmFrontend({
        Name: 'example',
        Product: 'linna-devops-course'
    })

}

main()

