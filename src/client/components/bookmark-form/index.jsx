/**
 * bookmark form
 */
import { useState, memo } from 'react'
import {
  Radio
} from 'antd'
import {
  settingMap,
  connectionMap,
  terminalSerialType,
  newBookmarkIdPrefix
} from '../../common/constants'
import SshForm from './ssh-form'
import SerialForm from './serial-form'

const { prefix } = window
const c = prefix('common')
const m = prefix('menu')
const s = prefix('setting')

export default memo(function BookmarkIndex (props) {
  const initType = props.formData.type === terminalSerialType
    ? terminalSerialType
    : 'ssh'
  const [bookmarkType, setBookmarkType] = useState(initType)
  const {
    id = ''
  } = props.formData
  const {
    type
  } = props
  if (type !== settingMap.bookmarks && type !== settingMap.history) {
    return null
  }
  function handleChange (e) {
    setBookmarkType(e.target.value)
  }
  return (
    <div className='form-wrap pd1x'>
      <div className='form-title pd1t pd1x pd2b'>
        {
          (!id.startsWith(newBookmarkIdPrefix)
            ? m('edit')
            : s('new')
          ) + ' ' + c(settingMap.bookmarks)
        }
        <Radio.Group
          buttonStyle='solid'
          size='small'
          className='mg1l'
          value={bookmarkType}
          onChange={handleChange}
        >
          {
            Object.keys(connectionMap).map(k => {
              const v = connectionMap[k]
              return (
                <Radio.Button key={v} value={v}>{v}</Radio.Button>
              )
            })
          }
        </Radio.Group>
      </div>
      {
        bookmarkType === connectionMap.ssh
          ? <SshForm {...props} />
          : <SerialForm {...props} />
      }
    </div>
  )
})
