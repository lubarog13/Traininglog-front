import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface NavItem {
    displayName: string;
    disabled?: boolean;
    iconName?: IconDefinition;
    active?: string;
    route?: string;
    children?: NavItem[];
}