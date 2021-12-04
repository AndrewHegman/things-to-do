import { Chip, Divider, Drawer, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import React from "react";
import { ToDoItem } from "../Interface/ToDoItem";
import { useAppSelector, selectors } from "../Redux";
import { toDos as toDoItemsApi } from "../API/toDos";
import { Box } from "@mui/system";
import { CreateToDoDialog } from "./CreateToDoDialog";
import { APIBuilder } from "../API/urlBuilder";

interface IToDoListProps {}

export const ToDoList: React.FC<IToDoListProps> = () => {
  const [toDoItems, setToDoItems] = React.useState<ToDoItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [showCreateToDoDialog, setShowCreateToDoDialog] = React.useState(true);

  const theme = useTheme();
  const selectedToDo = React.useRef<ToDoItem>();
  const isCategoriesLoading = useAppSelector(selectors.categories.selectCategoriesLoading);
  const currentCategory = useAppSelector(selectors.categories.selectCurrentCategory);
  const apiBuilder = new APIBuilder();

  const fetchToDoItems = async () => {
    if (currentCategory) {
      setIsLoading(true);
      // setToDoItems(await toDoItemsApi.getToDosByCategoryKey(currentCategory.key, false, 0));
      console.log(await apiBuilder.toDoItems().byCategoryKey(currentCategory.key).get().fetch());
      setToDoItems(await apiBuilder.toDoItems().byCategoryKey(currentCategory.key).get().fetch());
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
    selectedToDo.current = toDoItem;
    setShowDrawer(true);
  };

  const onCloseDrawer = () => {
    selectedToDo.current = undefined;
    setShowDrawer(false);
  };

  const onCreateToDoDialogClose = async (didUpdate: boolean) => {
    if (didUpdate) {
      fetchToDoItems();
    }
    setShowCreateToDoDialog(false);
  };

  return (
    <>
      <List>
        {!isLoading ? (
          <>
            {toDoItems.map((toDoItem) => (
              <React.Fragment key={toDoItem.id}>
                <ListItem onClick={() => onToDoSelect(toDoItem)}>
                  <ListItemText primary={toDoItem.name} secondary={getTags(toDoItem)} secondaryTypographyProps={{ component: "span" }} />
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
        open={showDrawer}
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
            {selectedToDo.current?.name}
          </Typography>
          <Divider />
          <List>
            <ListItem button>
              <ListItemText>Edit</ListItemText>
            </ListItem>
            <ListItem button disabled>
              <ListItemText>More Info</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText sx={{ color: theme.palette.error.light }}>Delete</ListItemText>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <CreateToDoDialog isOpen={showCreateToDoDialog} onClose={(didUpdate: boolean) => onCreateToDoDialogClose(didUpdate)} />
    </>
  );
};
