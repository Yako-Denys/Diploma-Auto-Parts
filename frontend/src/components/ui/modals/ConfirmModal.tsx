import { PropsWithChildren } from "react"

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "../AlertDialog"

interface ConfirmModalProps {
  handleClick: () => void
}

export function ConfirmModal({ children, handleClick }: PropsWithChildren<ConfirmModalProps>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ви впевнені?</AlertDialogTitle>
          <AlertDialogDescription>Цю дію неможливо відмінити.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Закрити</AlertDialogCancel>
          <AlertDialogAction className="bg-blue-500 hover:bg-blue-500/90" onClick={() => handleClick()}>
            Продовжити
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
