//import { ListToolBar } from '../../shared/components';
import { EditToolBar } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';

export const Dashboard = () => {
  
  return (
    <BasePageLayout 
      title='Página inicial'
      toolBar={<EditToolBar />}
    >
      Conteúdo da página

    </BasePageLayout>
  );

};