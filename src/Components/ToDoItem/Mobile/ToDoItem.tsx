import React from "react";
import { Typography, Card } from "@material-ui/core";
import { useToDoItemStyles } from "./ToDoItem.styles";
import { IToDoItemProps } from "../Common";
import { features } from "../../../features";
import { ActionMenu } from "../../ActionMenu/ActionMenu";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { RootState } from "../../../Redux/Store/index";
import { actions } from "../../../Redux";
import { Tag } from "../../../Interface/Tags";
import { Tag as TagComponent } from "../../Tag/Tag";

const mapStateToProps = (state: RootState) => ({
  selectedTags: state.tags.selectedTags,
});

interface IMobileToDoItemProps extends IToDoItemProps, PropsFromRedux {}

const ToDoItemComponent: React.FC<IMobileToDoItemProps> = (props) => {
  const classes = useToDoItemStyles();
  const dispatch = useDispatch();

  const { item, tags, selectedTags } = props;

  const menuItems = [
    {
      text: "Edit",
      onClick: props.onEdit,
      closeMenuOnClick: true,
    },
    { text: "Delete", onClick: props.onDelete, closeMenuOnClick: true },
  ];

  const onTagClick = (selectedTag: Tag) => {
    if (selectedTags.findIndex((tag) => tag.id === selectedTag.id) !== -1) {
      dispatch(actions.tags.removeSelectedTag(selectedTag));
    } else {
      dispatch(actions.tags.addSelectedTag(selectedTag));
    }
  };

  return (
    <>
      <Card className={classes.contentContainer}>
        <div className={classes.infoContainer}>
          <Typography variant="h5" component="h2" className={classes.title}>
            {item?.name}
          </Typography>
          <div className={classes.tagContainer}>
            {features.useTags &&
              tags.map((tag) => (
                <TagComponent
                  key={tag.id}
                  deletable={false}
                  isSelected={selectedTags.map((tag) => tag.id).includes(tag.id)}
                  onClick={() => onTagClick(tag)}
                  tag={tag}
                />
              ))}
          </div>
        </div>
        <ActionMenu menuItems={menuItems} />
      </Card>
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const ToDoItem = connector(ToDoItemComponent);
