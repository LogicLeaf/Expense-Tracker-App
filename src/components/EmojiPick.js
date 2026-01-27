import React from 'react'
import EmojiPicker from 'emoji-picker-react';
import styled from 'styled-components';

const PickerButton=styled.div`
display:flex;
justify-content:center;
border:1px solid #e6e6e6ff;
width:120px;
padding:4px;
border-radius:5px;
box-shadow:0px 0px 3px #e6e6e6ff;
cursor:pointer;
transition: all 0.3s ease;
&:hover{
background-color: #ecececff}
`
 const EmojiWrapper=styled.div`
 position:relative;
`
const EmojiPickerWrap=styled.div`
position:absolute;
z-index:1000;
top: 40px;   /* adjust height to float below button */
left: 0;

width:400px;
EmojiPicker{
background-color:red;
}
`
export default function EmojiPick({showPicker,setPicker,currEmoji,setEmoji}) {


const emojiUpdate=(emojiData)=>{
setEmoji(emojiData.emoji)
setPicker(!showPicker)
}

// const getEmoji=(emojiData)=>{
//       setEmoji(emojiData.emoji)
//       }
const showPickerHandle=()=>{
setPicker(!showPicker)
}
  return (
    <div>
      <EmojiWrapper>
      <PickerButton  onClick={showPickerHandle}>Add emoji {currEmoji}</PickerButton>
      {showPicker&&
        <EmojiPickerWrap>
        <EmojiPicker onEmojiClick={emojiUpdate}
        searchDisabled={true} 
        skinTonesDisabled={true}/>
      </EmojiPickerWrap>}
      </EmojiWrapper>
      
    </div>
  )
}
