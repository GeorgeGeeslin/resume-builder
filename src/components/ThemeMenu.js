import React, {useContext} from 'react';
import Context from '../context/Context';
import { ThemeModal, ThemeModalContent, ThemeWindow } from './ui/elements';
import singleColumnImage from '../images/single-column.png';
import defaultImage from '../images/default.png';
import modernImage from '../images/modern.png';

const ThemeMenu = () => {

  const context = useContext(Context);
  const {themeModal} = context.configState
  const {baseInfoChange, configInfoChange} = context;

  const themeModalActive = themeModal ? 'block' : 'none';

  return (
  <ThemeModal id="theme-modal" active={themeModalActive} onClick={(e) => configInfoChange(
    {
      payload: !themeModal,
      name: 'themeModal'
    }
  )}>
    <ThemeModalContent>
      <ThemeWindow onClick={(e) => baseInfoChange(
        {
          payload: 'default',
          name: 'theme'
        }
      )}>
        <div style={{textAlign: 'center'}}>
         <p>Minimalist Compact</p>
        </div>
        <img src={defaultImage} alt="Minimalist compact resume theme" />
      </ThemeWindow>

      <ThemeWindow onClick={(e) => baseInfoChange(
        {
          payload: 'singleColumn',
          name: 'theme'
        }
      )}>
        <div style={{textAlign: 'center'}}>
          <p>Minimalist Single Column</p>
        </div>
        <img src={singleColumnImage} alt="Minimalist single column resume theme" />
      </ThemeWindow>

      <ThemeWindow onClick={(e) => baseInfoChange(
        {
          payload: 'modern',
          name: 'theme'
        }
      )}>
        <div style={{textAlign: 'center'}}>
          <p>Modern</p>
        </div>
        <img src={modernImage} alt="Modern compact resume theme" />
      </ThemeWindow>

      {/* TODO Add 3rd and 4th themes here
      <ThemeWindow onClick={(e) => baseInfoChange(
        {
          payload: 'default',
          name: 'theme'
        }
      )}>
        <div style={{textAlign: 'center'}}>
         <p>Minimalist Compact</p>
        </div>
        <img src={defaultImage} alt="default resume theme" />
      </ThemeWindow>
      <ThemeWindow onClick={(e) => baseInfoChange(
        {
          payload: 'singleColumn',
          name: 'theme'
        }
      )}>
        <div style={{textAlign: 'center'}}>
          <p>Minimalist Single Column</p>
        </div>
        <img src={singleColumnImage} alt="single column resume theme" />
      </ThemeWindow>
      */}
    </ThemeModalContent>
  </ThemeModal>
  );
};

export default ThemeMenu;