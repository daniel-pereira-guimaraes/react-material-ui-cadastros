import { ListToolBar } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';

export const Dashboard = () => {
  
  return (
    <BasePageLayout 
      title='Página inicial'
      toolBar={<ListToolBar searchVisible />}
    >
      Conteúdo da página

    </BasePageLayout>
  );

};