import { useNavigate, useParams } from "react-router-dom"

import { BasePageLayout } from "../../shared/layouts"
import { DetailToolBar } from "../../shared/components"

export const DetalheCidade: React.FC = () => {

  const navigate = useNavigate();
  const { id = 'nova' } = useParams<'id'>();

  return (
    <BasePageLayout 
      title={`Editar cidade ${id}`}
      toolBar={
        <DetailToolBar
          saveAndBackButtonVisible
          newButtonText="Nova"
          newButtonOnClick={() => navigate('/cidades/detalhe/nova')}
          deleteButtonVisible={id !== 'nova'}
          deleteButtonOnClick={() => {}}
          backButtonOnClick={() => navigate('/cidades')}
        />
      }>
  
    </BasePageLayout>
  )

}