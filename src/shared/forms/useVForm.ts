import { FormHandles } from "@unform/core";
import { useCallback, useRef } from "react";

type TActionAfterSave = 'none' | 'new' | 'close';

export const useVForm = () => {

  const formRef = useRef<FormHandles>(null);
  const actionAfterSave = useRef<TActionAfterSave>('none');

  const handleSave = useCallback(() => {
    actionAfterSave.current = 'none';
    formRef.current?.submitForm();
  }, []);

  const handleSaveAndClose = useCallback(() => {
    actionAfterSave.current = 'close';
    formRef.current?.submitForm();
  }, []);

  const handleActionAfterSave = useCallback(() => {
    return actionAfterSave.current;
  }, []);

  return { 
    formRef,
    save: handleSave,
    saveAndClose: handleSaveAndClose,
    actionAfterSave: handleActionAfterSave
  };
}