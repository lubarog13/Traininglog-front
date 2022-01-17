import { NavItem } from "./nav_item";
import { faCalendarAlt, faBookOpen, faChartPie, faUserCircle, faInfo, faRunning, faEnvelope, faUserEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
                route: "/info/clubs?myclubs=false"
            },
            {
                displayName: "О нас",
                route: "/aboutus"
            }
        ]
    }
]

export const PROFILEITMS: NavItem[] = [
    {
        displayName: "Мои секции",
        iconName: faRunning,
        route: "/info/clubs?myclubs=true"
    },
    {
        displayName: "Мои сообщения",
        iconName: faEnvelope,
        route: "/profile/messages?incoming=true",
        children: [
            {
                displayName: "Входящие",
                route: "/profile/messages?incoming=true"
            },
            {
                displayName: "Исходящие",
                route: "/profile/messages?incoming=false"
            }
        ]
    },
    {
        displayName: "Редактировать профиль",
        iconName: faUserEdit,
        route: "/profile/edit/"
    },
    {
        displayName: "Выход",
        iconName: faSignOutAlt,
        route: "/profile/logout/"
    }
]