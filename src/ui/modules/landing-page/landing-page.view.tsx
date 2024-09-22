import {HeroTopView} from "@/src/ui/modules/landing-page/components/hero-top/hero-top.view";
import {FeaturedView} from "@/src/ui/modules/landing-page/components/featured/featured.view";
import {CodersMonkeysSlackView} from "./components/coders-monkeys-slack/coders-monkeys-slack.view";
import {
    CurrentCourseCtaView
} from "@/src/ui/modules/landing-page/components/current-course-cta/current-course-cta.view";
import {HighlightListView} from "@/src/ui/modules/landing-page/components/highlight-list/highlight-list.view";
import {CallToActionView} from "@/src/ui/design-system/call-to-action/call-to-action.view";

export const LandingPageView = () => {
    return (
        <>
            <HeroTopView/>
            <FeaturedView/>
            <CodersMonkeysSlackView/>
            <CurrentCourseCtaView/>
            <HighlightListView/>
            <CallToActionView/>
        </>
    )
}