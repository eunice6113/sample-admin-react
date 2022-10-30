import { Dropdown, InputText, RadioButton, Button, Checkbox, Calendar, InputSwitch } from 'primereact';
import * as React from 'react';
import { BasePage } from '../../../shared/components/base/BasePage';
import { useBasePage } from '../../../shared/hooks/base-page.hook';
import './CLPSURM93430.css';
import ViewTemplate from '../../../shared/components/template/ViewTemplate';
import TextEditor from '../../../shared/components/ui/text-editor/TextEditor';
import CldFileUpload from '../../../shared/components/CldFileUpload';
import { Survey, Question } from '../../../core/models/survey_CJ';
import Questionnaire_CJ from '../../../shared/components/survey/Questionnaire_CJ';


//설문 등록
const CLPSURM93430:React.FC = () => {
    const { goPage } = useBasePage()

    //설문 공통 ****************************************************************************
    
    //노출구분 라디오
    const expsOpt = [
        {name: '내부', key: 'inside'}, 
        {name: '외부', key: 'outside'},
    ];
    
    const questionTypeOptions = [
        { name: '단답형', value: 'question' },
        { name: '장문형', value: 'longForm' },
        { name: '객관식 질문(단수)', value: 'singularQ' },
        { name: '객관식 질문(복수)', value: 'mulipleQ' },
        { name: '척도선택', value: 'measure' },
        { name: '날짜선택', value: 'date' },
    ];

    const measureNumOpt = [
        { name: '1', value: '1' },
        { name: '2', value: '2' },
        { name: '3', value: '3' },
        { name: '4', value: '4' },
        { name: '5', value: '5' },
        { name: '6', value: '6' },
        { name: '7', value: '7' },
        { name: '8', value: '8' },
        { name: '9', value: '9' },
        { name: '10', value: '10' },
    ];


    //설문지 초기값
    let survey_initialize:Survey = {
        title: '',                          //설문 제목
        type: {optCon: '내부', key: 'inside'}, //노출구분 라디오
        daterange: {                        //설문기간
            fromDate: new Date(),
            toDate: new Date()
        },
        content: '',                        //설문 내용
        questions: [                        //설문 질문지들
            {
                question: '',               //질문 입력 인풋
                requiredToggle: false,      //필수 여부 토글 
                questionType: '',           //질문유형 선택

                selectedRadio: {optCon:'', key:''},  //객관식 질문 - 단수형
                selectedCheck: [],          //객관식 질문 - 복수형 선택시
                options: [                  //객관식 질문 옵션목록 
                    {optCon: '선택 1', key: 0, optIdx:0 ,optSqc:0 }, 
                ],
                date: new Date(),           //날짜형
                measure: {                  //척도형
                    from: '',
                    to: '',
                    fromLabel: '',
                    toLabel: '',
                }
            }
        ]
    }
    
    //설문지 전체 데이터
    const [survey, setSurvey] = React.useState<Survey>(survey_initialize)


    React.useEffect(() => {

        console.log('survey ==>', survey)

    }, [survey])

    
    React.useEffect(() => {

        //console.log('여기타나 ==>', survey.questions)

    }, [survey.questions])


    // 설문 > id 번째 문항 내 라디오, 체크박스 옵션 추가 
    const addOption = ( qst_id:any, qst_opts:any ) => {

        console.log('qst_opts=>',qst_opts)
        const newOption = {
            optCon: ''
            ,key: 'opt' + qst_id + Math.random()*100
            ,optIdx:qst_id
            ,optSqc:qst_opts.length +1
            //,key:''
            
        };

        const questions = survey.questions.map(( question, i ) => {
            if( i === qst_id ) {
                const options = question.options !== undefined ? [ ...question.options, newOption ] : [ newOption ]
                return { ...question, options }
            }
            return question;
        })

        setSurvey({
            ...survey, 
            questions
        })
    }

    // 설문 > id 번째 문항 내 라디오, 체크박스 옵션 삭제
    const deltOption = ( qst_id:any, opt_key:any ) => {
        const questions = survey.questions.map((question, i) => {
            if( i === qst_id ) {
                const options = question?.options?.filter((item:any) => item.key !== opt_key )
                
                // const options = optionssss?.map((item:any, index) => {
                  
                //     return {
                //       ...item,
                //       optSqc:index
                //     };
                  
                // });

                return { ...question, options }
            }
            return question;
        })

        setSurvey({
            ...survey,
            questions
        })
    }

    // 설문 > id 번째 문항 내 라디오, 체크박스 옵션 수정
    const updateOption = ( qst_id:any, opt_id:any, opt_key:any, opt_type:any, opt_value:any ) => {

        console.log('updateOption qst_id', qst_id,
                     'opt_id', opt_id, 
                     'opt_key', opt_key, 
                     'opt_type', opt_type, 
                     'opt_value', opt_value)

        const questions = survey.questions.map(( question, i ) => {
            if( i === qst_id ) {
                
                const options = question?.options?.map((item:any, oid) => {
                    // console.log('item[opt_key]', item[opt_key], oid, opt_id)
                    if (oid === opt_id) {
                      return {
                        ...item,
                        [opt_type]: opt_value,
                        optSqc:opt_id
                      };
                    } else {
                        return item
                    }
                });
                return { ...question, options }
            }
            return question;
        })

        setSurvey({
            ...survey, 
            questions
        })
    }
    
    // 설문 문항 추가
    const addQuestion = () => {

        const newQuestion:Question = {
            question: '',               //질문 입력 인풋
            requiredToggle: false,      //필수 여부 토글 
            questionType: '',           //질문유형 선택

            selectedRadio: {optCon:'', key:''},  //객관식 질문 - 단수형
            selectedCheck: [],         //객관식 질문 - 복수형
            options: [                  //객관식 질문 옵션목록 
                {optCon: '선택 1', key: 0,optIdx:0,optSqc:0}, 
            ],
            date: new Date(),           //날짜형
            measure: {                  //척도형
                from: '',
                to: '',
                fromLabel: '',
                toLabel: '',
            }
        }

        setSurvey(prevState => ({
            ...prevState,        
            questions: [            
              ...prevState.questions, 
              newQuestion   
            ]
        }));
    }

    // 설문 제목, 설문기간, 노출구분
    const handleSurveyChange = ( prop:any, value:any ) => {
        setSurvey({ ...survey, [prop]: value });
    };

    // 설문내용
    const handleContentSurveyChange = ( value?:any ) => {
        setSurvey({ ...survey, content: value });
    };

    // 설문 > 질문 내용 업데이트
    const handleSurveyQuestionChange = ( q_id:any, type:any, value:any ) => {

        const updateQuestions:any[] = survey.questions.map((item:any, i:number ) => {
            if (i === q_id) {
              return {
                ...item,
                [type]: value
              };
            } else {
                return item
            }
        });
        // console.log('updateQuestions', updateQuestions)
        setSurvey({ ...survey, questions: updateQuestions });
    }

    // 설문 > 질문 중 체크박스 업데이트
    const handleSurveyQuestionChkChange = ( e: { value: any, checked: boolean }, q_id:any, checkedList:any ) => {

        let _selectedCheckboxs = [...checkedList];

        if (e.checked) {
            _selectedCheckboxs.push(e.value);
        }
        else {
            for (let i = 0; i < _selectedCheckboxs.length; i++) {
                const selected = _selectedCheckboxs[i];

                if (selected.key === e.value.key) {
                    _selectedCheckboxs.splice(i, 1);
                    break;
                }
            }
        }

        // console.log('_selectedCheckboxs', _selectedCheckboxs)

        const updateQuestions:any[] = survey.questions.map((item:any, i:number ) => {
            if (i === q_id) {
              return {
                ...item,
                selectedCheck: _selectedCheckboxs
              };
            } else {
                return item
            }
        });
        // console.log('updateQuestions', updateQuestions)

        setSurvey({ ...survey, questions: updateQuestions });
    }

    // 설문 > 질문 중 척도형 업데이트
    const handleSurveyMeasureChange = ( q_id:any, type:any, value:any ) => {

        const updateQuestions:any[] = survey.questions.map((item:any, i:number ) => {
            if (i === q_id) {
                let measure = Object.assign(item.measure, {[type]: value})
                return {
                    ...item,
                    measure
                };
            } else {
                return item
            }
        });
        
        console.log('updateQuestions Measure', updateQuestions)
        
        
        setSurvey({ ...survey, questions: updateQuestions });
    }

    //설문 문항 복제 버튼
    const duplicate = ( e:any, quastion:Question ) => {
        console.log(quastion, '설문 문항 복제')


         setSurvey(prevState => ({
            ...prevState,        
            questions: [            
              ...prevState.questions, 
              //quastion
              quastion   
            ]
        }));
    }

    //설문 문항 삭제
    const delt = ( e:any, q_id:number ) => {
        console.log(q_id, '설문 문항 삭제')

        const questions = survey.questions.filter((question, i) => i !== q_id )

        setSurvey({
            ...survey,
            questions
        })
    }

    //목록 버튼
    const list = () => {
        goPage('/qsm/list')
    }
    
    //취소 버튼
    const cancel = () => {
        console.log('취소')
    }

    //완료 버튼
    const confirm =() => {
        test()

    }

    const test =() => {
      
        console.log('조립전 ==>', survey)



        const questions = survey.questions?.map((question, i:any) => {
           
            console.log('test~~ ==>',i,'번째', question)
           
            // const justOption = question.questionType == "measure"?
            // {
            //  return [{optCon:question.measure?.fromLabel, key: 0, optIdx:0 ,optSqc:question.measure?.from },
            //         {optCon: question.measure?.toLabel, key: 1, optIdx:0 ,optSqc:question.measure?.to }]
            
            // }

           // console.log('justOption', justOption)

            //const justOption = question?.options

            // if(question.questionType == "measure"){
                
            //     const test ={optCon:question.measure?.fromLabel, key: 0, optIdx:0 ,optSqc:question.measure?.from },
            //         {optCon: question.measure?.toLabel, key: 1, optIdx:0 ,optSqc:question.measure?.to };
            
            //     //console.log('test~~ ==>',i,'번째 question.measure:', question.measure)
            //     question.options?.concat(test)
              
            //     return {
            //         ...question,
            //         options: [{optCon:question.measure?.fromLabel, key: 0, optIdx:0 ,optSqc:question.measure?.from },
            //             {optCon: question.measure?.toLabel, key: 1, optIdx:0 ,optSqc:question.measure?.to }]
            //     };
            // }else{
            //     return {
            //         ...question,
            //         options: question?.options
            //     };
            // }
   

            const newOption = question?.options?.map((item:any, index) => {
                return {
                    ...item,
                    optIdx:i,
                    optSqc:index
                };

            });


            return {
                ...question,
                bigidx:i,
                options: newOption
            };

        })

   
        //console.log('조립후!!!!!!!!!=>', newQuestion)
        console.log('조립후!!!!!!!!!=>', questions)


        setSurvey({
            ...survey,
            questions
        })
       // setSurvey({ ...survey, questions: updateQuestions });
        console.log('완료 ==>', survey)

    }


    //api 읽어와서 업데이트 할 내용
    const authorInfo = {
        title: '등록자 정보',
        rows: [
            {
                cols: [
                    {
                        key: '등록자', 
                        value: '신재문(12345)'
                    },
                    {
                        key: '등록일시', 
                        value: ''
                    },
                ]
            }
        ]
    }


    return(
    <BasePage>
        {/* 등록자 정보 */}
        <ViewTemplate {...authorInfo} />

        {/* 상세 내용 */}
        <div className='view-container'>
            <h2 className='page-title mb5'>상세내용</h2>
            <div className='cld-table-cover'>
                <table className='cld-table'>
                    <colgroup>
                        <col width='15%'></col>
                        <col width='35%'></col>
                        <col width='15%'></col>
                        <col width='35%'></col>
                    </colgroup>
                    <caption>설문 상세 내용</caption>
                    <tbody>
                        <tr>
                            <th>제목 <span className='required'>*</span></th>
                            <td colSpan={3}>
                            <div><InputText placeholder='설문 제목을 입력해주세요.' value={survey.title} onChange={(e) => handleSurveyChange('title', e.target.value)} /></div>
                            </td>
                        </tr>
                        <tr>
                            <th>설문기간 <span className='required'>*</span></th>
                            <td>
                                <div className='d-flex'>
                                <Calendar dateFormat='yy.mm.dd' value={survey.daterange.fromDate} onChange={(e) => handleSurveyChange('daterange.fromDate', e.value)} showIcon />
                                <span className='mt5 mr5 ml5'>~</span>
                                <Calendar dateFormat='yy.mm.dd' value={survey.daterange.toDate} onChange={(e) => handleSurveyChange('daterange.toDate', e.value)} showIcon />
                                </div>
                            </td>
                            <th>노출구분</th>
                            <td>
                            {
                                expsOpt.map((category) => (
                                    <span key={category.key} className='field-radiobutton mr20'>
                                        <RadioButton inputId={category.key} name='category' value={category} 
                                            onChange={(e) => { handleSurveyChange('type', e.value)}} 
                                            checked={survey.type.key === category.key} 
                                            disabled={category.key === 'R'} 
                                        />
                                        <label htmlFor={category.key}>{category.name}</label>
                                    </span>
                                ))
                            }
                            </td>
                        </tr>
                        <tr>
                            <th>설문내용</th>
                            <td colSpan={3}>
                            <TextEditor value={survey.content} onTextChange={handleContentSurveyChange} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                <div className='survey'>
                                    {/* 복제, 삭제, 추가 범위 시작 --------------------------------------------------------------------------------------- */}
                                    {
                                        survey.questions.map(( question, q_id ) => (
                                            <Questionnaire_CJ 
                                                key={`survey-q-${q_id}`}
                                                q_id={q_id}
                                                question={question}
                                                handleSurveyQuestionChange={handleSurveyQuestionChange}
                                                questionTypeOptions={questionTypeOptions}
                                                measureNumOpt={measureNumOpt}
                                                updateOption={updateOption}
                                                deltOption={deltOption}
                                                addOption={addOption}
                                                handleSurveyQuestionChkChange={handleSurveyQuestionChkChange}
                                                handleSurveyMeasureChange={handleSurveyMeasureChange}
                                                duplicate={duplicate}
                                                delt={delt}
                                            />
                                        ))
                                    }
                                    {/* 복제, 삭제, 추가 범위 끝 ---------------------------------------------------------------------------------------- */}
                                    
                                    {/* 추가 버튼 */}
                                    <div className='d-flex justify-center'>
                                        <Button className='iconBtnAdd p-button-text mr10' icon='pi pi-plus-circle' onClick={addQuestion} />
                                    </div>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>

        {/* 버튼영역 */}
        <div className='btn-container cld-row'>
            <div className='cld-col-3'>
                <Button className='secondary' onClick={list}>목록</Button>
            </div>
            <div className='cld-col-6 text-center'></div>
            <div className='cld-col-3 d-flex'>
                <Button className='ml-auto outline' onClick={cancel}>취소</Button>
                <Button className='ml5' onClick={confirm}>완료</Button>
            </div>
        </div>
    </BasePage>)
}
export default CLPSURM93430;