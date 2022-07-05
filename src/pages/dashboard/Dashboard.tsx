import { ToolBar } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';

export const Dashboard = () => {
  
  return (
    <BasePageLayout 
      title='Página inicial'
      toolBar={<ToolBar searchVisible />}
    >
      Conteúdo da página

    </BasePageLayout>
  );

};