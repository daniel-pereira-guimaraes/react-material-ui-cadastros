//import { ListToolBar } from '../../shared/components';
import { DetailToolBar } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';

export const Dashboard = () => {
  
  return (
    <BasePageLayout 
      title='Página inicial'
      toolBar={<DetailToolBar saveAndCloseButtonVisible />}
    >
      Conteúdo da página

    </BasePageLayout>
  );

};