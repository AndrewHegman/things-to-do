import { Chip, Divider, Drawer, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import React from "react";
import { ToDoItem } from "../Interface/ToDoItem";
import { useAppSelector, selectors } from "../Redux";
import { Box } from "@mui/system";
import { CreateToDoDialog } from "./CreateToDoDialog";
import { APIBuilder } from "../API/urlBuilder";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { EditToDoDialog } from "./EditToDoDialog";

interface IToDoListProps {}

export const ToDoList: React.FC<IToDoListProps> = () => {
  const [toDoItems, setToDoItems] = React.useState<ToDoItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showCreateToDoDialog, setShowCreateToDoDialog] = React.useState(false);
  const [selectedToDo, setSelectedToDo] = React.useState<ToDoItem>();
  const [showDeleteToDoDialog, setShowDeleteToDoDialog] = React.useState<boolean>(false);
  const [showEditToDoDialog, setShowEditToDoDialog] = React.useState<boolean>(false);

  const theme = useTheme();
  const isCategoriesLoading = useAppSelector(selectors.categories.selectCategoriesLoading);
  const currentCategory = useAppSelector(selectors.categories.selectCurrentCategory);
  const apiBuilder = new APIBuilder();

  const fetchToDoItems = async () => {
    if (currentCategory) {
      setIsLoading(true);
      setToDoItems(await apiBuilder.toDoItems().byCategory(currentCategory.key).get().fetch());
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!isCategoriesLoading) {
      fetchToDoItems();
    }
  }, [isCategoriesLoading, currentCategory]);

  const getTags = (toDoItem: ToDoItem) => {
    return toDoItem.tags.map((tag) => <Chip key={tag.id} label={tag.name} />);
  };

  const onToDoSelect = (toDoItem: ToDoItem) => {
    setSelectedToDo(toDoItem);
    // setShowDrawer(true);
  };

  const onCloseDrawer = () => {
    setSelectedToDo(undefined);
    // setShowDrawer(false);
  };

  const onCreateToDoDialogClose = async (didUpdate: boolean) => {
    if (didUpdate) {
      fetchToDoItems();
    }
    setShowCreateToDoDialog(false);
  };

  const onEditToDoDialogClose = async (didUpdate: boolean) => {
    if (didUpdate) {
      fetchToDoItems();
    }
    setShowEditToDoDialog(false);
    setSelectedToDo(undefined);
  };

  const deleteToDo = async () => {
    if (selectedToDo) {
      setIsLoading(true);
      setShowDeleteToDoDialog(false);
      try {
        await apiBuilder.toDoItems().delete().byId(selectedToDo.id).fetch();
        setSelectedToDo(undefined);
        await fetchToDoItems();
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <List>
        {!isLoading ? (
          <>
            {toDoItems.map((toDoItem) => (
              <React.Fragment key={toDoItem.id}>
                <ListItem onClick={() => onToDoSelect(toDoItem)}>
                  <ListItemText
                    primary={toDoItem.name}
                    secondary={getTags(toDoItem)}
                    secondaryTypographyProps={{ component: "span" }}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
            <ListItem button onClick={() => setShowCreateToDoDialog(true)}>
              <ListItemText primary="Add new thing..." secondaryTypographyProps={{ component: "span" }} />
            </ListItem>
          </>
        ) : (
          <div>ToDos are loading...</div>
        )}
      </List>
      <Drawer
        anchor="bottom"
        open={!!selectedToDo}
        onClose={() => onCloseDrawer()}
        PaperProps={{
          sx: {
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          },
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {selectedToDo && selectedToDo.name}
          </Typography>
          <Divider />
          <List>
            <ListItem button>
              <ListItemText onClick={() => setShowEditToDoDialog(true)}>Edit</ListItemText>
            </ListItem>
            <ListItem button disabled>
              <ListItemText>More Info</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText sx={{ color: theme.palette.error.light }} onClick={() => setShowDeleteToDoDialog(true)}>
                Delete
              </ListItemText>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <CreateToDoDialog isOpen={showCreateToDoDialog} onClose={(didUpdate: boolean) => onCreateToDoDialogClose(didUpdate)} />
      <ConfirmationDialog
        open={showDeleteToDoDialog}
        onClose={() => setShowDeleteToDoDialog(false)}
        onConfirm={() => deleteToDo()}
        title="Are you sure?"
      >
        This will remove the category along with all associated
        <em>things</em>.<br />
        <span style={{ color: theme.palette.error.light }}>
          <strong>This action cannot be undone.</strong>
        </span>
      </ConfirmationDialog>
      <EditToDoDialog
        isOpen={showEditToDoDialog}
        toDo={selectedToDo!}
        onClose={(didUpdate: boolean) => onEditToDoDialogClose(didUpdate)}
      />
    </>
  );
};
