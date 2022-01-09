import { NavItem } from "./nav_item";
import { faCalendarAlt, faBookOpen, faChartPie, faUserCircle, faInfo } from '@fortawesome/free-solid-svg-icons';

export const MENUITEMS: NavItem[] = [
    {
        displayName: "Расписание",
        iconName: faCalendarAlt,
        active: "active",
        route: "/schedule"
    },
    {
        displayName: "Журнал",
        iconName: faBookOpen,
        route: "/traininglog"
    },
    {
        displayName: "Аналитика",
        iconName: faChartPie,
        route: "/analysis"
    },
    {
        displayName: "Информация",
        iconName: faInfo,
        route: "/info",
        children: [
            {
                displayName: "Здания",
                route: "/info/buildings"
            },
            {
                displayName: "Залы",
                route: "/info/halls"
            },
            {
                displayName: "Тренеры",
                route: "/info/coaches"
            },
            {
                displayName: "Секции",
                route: "/info/clubs"
            },
            {
                displayName: "О нас",
                route: "/aboutus"
            }
        ]
    }
]