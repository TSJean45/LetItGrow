import React, { useState } from 'react'
import { DashboardSidebar, ForumNavBar, DashboardNavbar } from '../components'
import './Forum.scss'
import { useNavigate } from 'react-router-dom'
import { IoIosSend } from "react-icons/io";

import profile1 from '../assets/forum-prof1.png'
import profile2 from '../assets/forum-prof2.png'
import profile3 from '../assets/forum-prof3.png'

const forumPosts = [
  {
    id: 1,
    title: 'how are my plant died after giving them fertilizer?😭',
    topanswer:
      'Too much fertilizer can potentially cause a chemical burn on the roots of your plant. In severe cases, it can also cause the whole plant to wilt and die.',
    answers: 2,
  },
  {
    id: 2,
    title: 'Best Practices for Pest Control in Organic Farming',
    topanswer:
      'Discovering effective pest control methods is crucial for maintaining the integrity of organic farming practices. Embracing natural predators, implementing crop rotation strategies, and utilizing ...',
    answers: 3,
  },
  {
    id: 3,
    title: 'What are the white spots on my plants?',
    topanswer:
      'Powdery mildew. You can also try out the AI plant disease detection from LetItGrow.',
    answers: 1,
  },
]

const steps = ['Step 1', 'Step 2', 'Step 3']

const Forum = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [selection, setSelection] = useState(null)

  const handleNext = (selected) => {
    setSelection(selected)
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1))
  }

  const handlePrev = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0))
  }

  //   Cancel Button
  const navigate = useNavigate()

  const handleCancel = () => {
    navigate('/')
  }

  const suggestionContent = (
    <div className="suggestion">
      <h2>Recent Posts</h2>
      <button>
        <h3>LiveStock Management: Caring for Healthy Animals</h3>
        <p>@DoraExplorer</p>
      </button>
      <button>
        <h3>Share Your Success Stories: Most Profitable Crops You've...</h3>
        <p>@Potato123</p>
      </button>
      <button>
        <h3>Easiest Way to Have Your First Plant</h3>
        <p>@sunsunplant</p>
      </button>
    </div>
  )

  return (
    <div className="Forum">
      <DashboardSidebar type="personal"/>
      <DashboardNavbar />
      <ForumNavBar />

      {currentStep === 0 && (
        <div className="post">
          {forumPosts.map((post) => (
            <div key={post.id} className="forum-post">
              <h2 className="post-title">{post.title}</h2>
              <h4 className="post-answer">{post.topanswer}</h4>
              <p className="answer-count">
                {currentStep === 0 && (
                  <button onClick={() => handleNext(post.id)}>
                    {post.answers} answers
                  </button>
                )}
              </p>
            </div>
          ))}
        </div>
      )}

      {currentStep === 1 && (
        <div className="postpage">
          {selection === 1 ? (
            <div className="content">
              <div className="maincontent">
                <main-post>
                  <identity>
                    <img src={profile1} alt="" />
                    <h5>@joseph477</h5>
                  </identity>

                  <h3>how are my plant died after giving them fertilizer?😭</h3>
                  <p>
                    I just giving my sunflower for fertilizer 1 week. I watered
                    them everyday and put them under the sun
                  </p>
                </main-post>
                <answers>
                  <answer>
                    <p>
                      <identity>
                        <img src={profile3} alt="" />
                        <h5>@dmme</h5>
                      </identity>
                      Too much fertilizer can potentially cause a chemical burn
                      on the roots of your plant. In severe cases, it can also
                      cause the whole plant to wilt and die.
                    </p>
                  </answer>
                  <answer>
                    <p>
                      <identity>
                        <img src={profile3} alt="" />
                        <h5>@abc1111</h5>
                      </identity>
                      How much of fertiizer you giving them a day?
                    </p>
                  </answer>
                </answers>

                <div className='write-comment'>
                  <input type="text" placeholder="Write Something..."></input>
                  <button>
                  <IoIosSend style={{width:'30px', height: '20px'}}/>
                  </button>
                </div>
              </div>
              {suggestionContent}
            </div>
          ) : selection === 2 ? (
            <div className="content">
              <div className="maincontent">
                <main-post>
                  <identity>
                    <img src={profile2} alt="" />
                    <h4>@GreenHarvester92</h4>
                  </identity>
                  <h3>Best Practices for Pest Control in Organic Farming</h3>
                  <p>
                    Discovering effective pest control methods is crucial for
                    maintaining the integrity of organic farming practices.
                    Embracing natural predators, implementing crop rotation
                    strategies, and utilizing companion planting are among the
                    best practices for a harmonious balance between pest
                    management and organic cultivation.
                  </p>
                </main-post>
                <answers>
                  <answer>
                    <p>
                      <identity>
                        <img src={profile3} alt="" />
                        <h5>@dmme</h5>
                      </identity>
                      It's helpful thanks!
                    </p>
                  </answer>
                  <answer>
                    <p>
                      <identity>
                        <img src={profile3} alt="" />
                        <h5>@haha222</h5>
                      </identity>
                      <b>@wannafly</b> look at this
                    </p>
                  </answer>
                  <answer>
                    <p>
                      <identity>
                        <img src={profile3} alt="" />
                        <h5>@lisa1313</h5>
                      </identity>
                      thanks bro
                    </p>
                  </answer>
                </answers>

                <div className='write-comment'>
                  <input type="text" placeholder="Write Something..."></input>
                  <button>
                  <IoIosSend style={{width:'30px', height: '20px'}}/>
                  </button>
                </div>
              </div>
              {suggestionContent}
            </div>
          ) : selection === 3 ? (
            <div className="content">
              <div className="maincontent">
                <main-post>
                  <identity>
                    <img src={profile2} alt="" />
                    <h4>@GreenHarvester92</h4>
                  </identity>
                  <h3>What are the white spots on my plants?</h3>
                  <p>
                    Recently on the chilli tree I plant, roughly in vegetative
                    stage of growth, the leave have some white spots. Does
                    anyone know what is this?
                  </p>
                </main-post>
                <answers>
                  <answer>
                    <p>
                      <identity>
                        <img src={profile3} alt="" />
                        <h5>@shark22</h5>
                      </identity>
                      Powdery mildew. You can also try out the AI plant disease
                      detection from LetItGrow.
                    </p>
                  </answer>
                </answers>

                <div className='write-comment'>
                  <input type="text" placeholder="Write Something..."></input>
                  <button>
                  <IoIosSend style={{width:'30px', height: '20px'}}/>
                  </button>
                </div>
              </div>
              {suggestionContent}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Forum
