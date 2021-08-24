import React from "react";

export const withDialogs = <Dialogs,>(WrappedComponent: React.FC<any>, dialogsMap: Map<JSX.Element, Dialogs>) => {
  return (props: any) => {
    const [currentDialogs, setCurrentDialogs] = React.useState<Dialogs[]>([]);

    const closeDialogs = (dialogsToClose: Dialogs[]) => {
      setCurrentDialogs(currentDialogs.filter((dialog) => !dialogsToClose.includes(dialog)));
    };

    const openDialogs = (dialogsToOpen: Dialogs[]) => {
      dialogsToOpen.forEach((dialog) => {
        if (!currentDialogs.includes(dialog)) {
          setCurrentDialogs([...currentDialogs, dialog]);
        }
      });
    };

    return (
      <>
        <WrappedComponent closeDialogs={closeDialogs} openDialogs={openDialogs} {...props} />
        {Array.from(dialogsMap.entries()).map((dialog) => {
          if (currentDialogs.includes(dialog[1])) {
            return dialog[0];
          }
          return null;
        })}
      </>
    );
  };
};
