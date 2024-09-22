import {Container} from "@/src/ui/components/container/container"
import {Typography} from "@/src/ui/design-system/typography/typography";

export const CurrentCourseCtaView = () => {
    return (
        <div className="bg-gray-300">
            <Container className="py-24 text-center">
                <Typography
                    variant="h2"
                    tag="h2"
                    className="mb-2.5"
                >
                    Formations React.js gratuite
                </Typography>
                <Typography
                    variant="lead"
                    tag="h3"
                    className="mb-5"
                >
                    Apprendre à coder l'app des Singes codeurs
                </Typography>
                <Typography
                    variant="caption3"
                    tag="p"
                    theme="gray"
                    className="mb-16"
                >
                    Si tu veux un CV plus sexy que ton ex, suis cette formation complète
                </Typography>
                <a href="/#" target="_blank">
                    <div className="relative bg-gray-400 rounded h-[626px]"></div>
                </a>
            </Container>
        </div>
    )
}