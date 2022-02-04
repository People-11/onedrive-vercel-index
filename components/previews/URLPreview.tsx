import FourOhFour from '../FourOhFour'
import Loading from '../Loading'
import { DownloadButton } from '../DownloadBtnGtoup'
import useAxiosGet from '../../utils/fetchOnMount'
import { DownloadBtnContainer, PreviewContainer } from './Containers'

const parseDotUrl = (content: string): string | undefined => {
  return content
    .split('\n')
    .find(line => line.startsWith('URL='))
    ?.split('=')[1]
}

const TextPreview = ({ file }) => {
  const { response: content, error, validating } = useAxiosGet(file['@microsoft.graph.downloadUrl'])
  if (error) {
    return (
      <PreviewContainer>
        <FourOhFour errorMsg={error} />
      </PreviewContainer>
    )
  }

  if (validating) {
    return (
      <PreviewContainer>
        <Loading loadingText="正在加载…" />
      </PreviewContainer>
    )
  }

  if (!content) {
    return (
      <PreviewContainer>
        <FourOhFour errorMsg="文件无内容" />
      </PreviewContainer>
    )
  }

  return (
    <div>
      <PreviewContainer>
        <pre className="overflow-x-scroll p-0 text-sm md:p-3">{content}</pre>
      </PreviewContainer>
      <DownloadBtnContainer>
        <div className="flex justify-center">
          <DownloadButton
            onClickCallback={() => window.open(parseDotUrl(content) || '')}
            btnColor="blue"
            btnText="打开链接"
            btnIcon="external-link-alt"
            btnTitle={`打开链接 ${parseDotUrl(content) || ''}`}
          />
        </div>
      </DownloadBtnContainer>
    </div>
  )
}

export default TextPreview
