import {Participant} from '../store/app/types'
import {Result} from '../store/system/types'
import  dayjs from 'dayjs' 
import 'dayjs/locale/ja'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('ja')
dayjs.extend(relativeTime)
export const dayEditor = dayjs

export const nl2br = (str:string) => {
  return str.replace(/[\n\r]/g,"<br/>")
}

export const dateFormat = (d:Date):string => {
  const d2 = new Date(d)
 return `${d2.getFullYear()}-${(d2.getMonth()+1).toString().padStart(2,'0')}-${(d2.getDate()).toString().padStart(2,'0')}T${d2.getHours().toString().padStart(2,'0')}:${d2.getMinutes().toString().padStart(2,'0')}`
}

export const dateFormatNotime = (d:Date):string => {
  const d2 = new Date(d)
 return `${d2.getFullYear()}-${(d2.getMonth()+1).toString().padStart(2,'0')}-${(d2.getDate()).toString().padStart(2,'0')}`
}

export const dateFormatwithTime = (d:Date):string => {
  const d2 = new Date(d)
 return `${d2.getFullYear()}-${(d2.getMonth()+1).toString().padStart(2,'0')}-${(d2.getDate()).toString().padStart(2,'0')} ${d2.getHours().toString().padStart(2,'0')}:${d2.getMinutes().toString().padStart(2,'0')}`
}

const youbi = ["日","月","火","水","木","金","土"]
export const dataFormatwithday = (d:Date):string => {
  const d2 = new Date(d)
  return `${d2.getFullYear()}年${(d2.getMonth()+1).toString().padStart(2,'0')}月${(d2.getDate()).toString().padStart(2,'0')}日(${youbi[d2.getDay()]})
   ${d2.getHours().toString().padStart(2,'0')}:${d2.getMinutes().toString().padStart(2,'0')}`
}

export const ExtractionParticipants = (status:number,p:Participant[]):Participant[] => {
  let result = p.filter((data)=> data.status === status)
  return result
}

export const ExtractionParticipantsToScreenName = (status:number,p:Participant[]):string[] => {
  let result = p.filter((data)=> data.status === status)
  let temp:string[] = []
  result.forEach(val => {
    temp.push(val.user.screen_name)
  })
  return temp
}

export const SearchLog = (log:Result[],name:string):Result => {
  let result = log.find((v) => v.name === name)
  if (result !== undefined) {
    return result
  } else {
    return {name:"",status:999,cause:""}
  }
}

export const getStatus = (data:number):string => {
  switch (data) {
    case 1:
      return "参加"
    case 2:
      return "興味あり"
    case 3:
      return "不参加"
    default:
      return ""
  }
}

export const getInOut = (data:number):string => {
  if (data === 1) {
    return "IN"
  } else {
    return "OUT"
  }
}

export const getAvatar = (data:Participant[],uid:number | null):string => {
  if (uid == null)  return ""
  let result = data.find((v) => v.user_id === uid) 
  if (result !== undefined) {
    return result.user.avatar
  }
  return ""
}

export const getSex = (data:number):string => {
  if (data === undefined) return ""
  if (data === 1) {
    return "男性"
  }else{
    return "女性"
  } 
}

export const getSexNumber = (data:Participant[] | null,uid:number | null):number => {
  if (data === null) return 0
  if (uid === null) return 0
  let result = data.find((v) => v.user_id === uid)
  if (result !== undefined) {
    return result.user.sex == null ? 0: result.user.sex
  }
  return 0
}

export const ParticipantsStatus = (status:number,uid:number | null,data:Participant[]):boolean => {
  if (uid ===  undefined) return false
  let result = data.find(v => v.user_id === uid) 
  if (result !== undefined) {
    if (result.status === status) {
      return true
    }
    return false
  } 
  return false
}


export const getAge = (data:Date):string => {
  if (data === undefined) return ""
  const today = dayEditor()
  const birth = dayEditor(data)
  const base = today.year() - birth.year()
  const thisBirth = dayEditor(`${today.year()}-${birth.month()}-${birth.date()}`)
  return today.isBefore(thisBirth) ? base-1 + "歳": base + "歳"
}

export const getName = (data:Participant[],uid:number | null):string => {
  if (uid === null) return "-"
  let result = data.find((v) => v.user_id === uid) 
  if (result !== undefined) {
      return result.user.screen_name
  } else {
    return "-"
  }
}
