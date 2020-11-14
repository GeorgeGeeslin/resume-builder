import React, {useContext} from 'react';
import Context from '../context/Context';
import ResumeInput from './ResumeInput';
import ResumePreview from './ResumePreview';
import PageCountWarning from '../components/PageCountWarning';
import { ThemeModal, ThemeModalContent, ThemeWindow } from '../components/ui/elements';
import singleColumnImage from '../images/single-column-placeholder-sm.png';
import defaultImage from '../images/default-placeholder-sm.jpg';

// TODO extract modal stuff into seperate component

const ResumeEditor = () => {

    const context = useContext(Context);
    const {themeModal} = context.resumeContent
    const {baseInfoChange} = context;

    const themeModalActive = themeModal ? 'block' : 'none';

    return (
        <div style={{display: 'flex', backgroundColor: '#DFE1E6'}}>
            <PageCountWarning /> 
            <ResumeInput />
            <ResumePreview />
            <ThemeModal id="theme-modal" active={themeModalActive} onClick={(e) => baseInfoChange(
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
        </div>
    )
};

export default ResumeEditor;