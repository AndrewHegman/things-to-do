import { IBaseDialogProps } from "../Dialog/Common";

export interface ICreateNewToDoItemProps {}

export interface IBaseCreateNewToDoItemDIalogProps extends Omit<IBaseDialogProps, "direction"> {
  onCloseClicked?: () => void;
}
