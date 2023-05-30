import { View } from '@tarojs/components'
import React from 'react'

import HuiCollapsePanel from '@/components/CollapsePanel'
import HuiIcon from '@/components/Icon'
import HuiText from '@/components/Text'
import GroupSection from '@/demoComponents/GroupSection'
import PageHeader from '@/demoComponents/PageHeader'
import './CollapsePanel.scss'

const CollapsePanelDemo: React.FC = () => (
  <View className='collapse-panel-page'>
    <PageHeader image='' title='折叠面板CollapsePanel' desc='' />
    <View className='content'>
      <GroupSection title='基础用法'>
        <HuiCollapsePanel title='第一项' name='1'>
          <HuiText>
            Iron Man, also known as Tony Stark, is a legendary superhero who has
            captivated audiences worldwide with his high-tech armor, sharp wit,
            and charismatic personality. Created by Marvel Comics and making his
            first appearance in 1963, Iron Man has become an iconic figure in
            the realm of superheroes.
          </HuiText>
        </HuiCollapsePanel>
        <HuiCollapsePanel title='第二项' name='2' active={false}>
          <HuiText>
            Thor, the God of Thunder, is a powerful and iconic superhero from
            the Marvel Comics universe. Based on the Norse mythology deity of
            the same name, Thor has captured the hearts of audiences with his
            mighty hammer, godlike abilities, and noble character.
          </HuiText>
        </HuiCollapsePanel>
        <HuiCollapsePanel title='第三项' name='3' active={false}>
          <HuiText>
            Spider-Man, the friendly neighborhood superhero, has swung his way
            into the hearts of fans worldwide with his iconic red and blue
            costume, acrobatic abilities, and relatable persona. Created by
            writer Stan Lee and artist Steve Ditko, Spider-Man is one of Marvel
            Comics most beloved and enduring characters.
          </HuiText>
        </HuiCollapsePanel>
      </GroupSection>
      <GroupSection title='禁用'>
        <HuiCollapsePanel title='First' name='first'>
          <HuiText>
            Ant-Man, portrayed by Scott Lang, is a Marvel superhero known for
            his ability to shrink in size while maintaining his strength.
            Equipped with a high-tech suit and the power to communicate with
            ants, Ant-Man uses his unique abilities to fight crime and assist
            the Avengers in their missions.
          </HuiText>
        </HuiCollapsePanel>
        <HuiCollapsePanel
          title='Second(disabled)'
          name='second'
          active={false}
          disabled
        >
          <HuiText>
            Captain America, the embodiment of courage and virtue, is a Marvel
            superhero who fought in World War II. Enhanced with a super-soldier
            serum, Steve Rogers wields his iconic shield and leads the Avengers.
            His unwavering commitment to justice and his unwavering moral
            compass make him a true symbol of heroism.
          </HuiText>
        </HuiCollapsePanel>
      </GroupSection>
      <GroupSection title='自定义折叠文字和图标'>
        <HuiCollapsePanel
          title='custom-icon1'
          name='custom-icon1'
          expandIcon={<HuiIcon name='h110-upwards' />}
        >
          <HuiText>
            Black Widow, also known as Natasha Romanoff, is a formidable and
            skilled Marvel superheroine. Trained as a spy and assassin, she
            defected from her dark past to become a crucial member of the
            Avengers. With her exceptional combat skills and resourcefulness,
            she fights for justice and redemption with unwavering determination.
          </HuiText>
        </HuiCollapsePanel>
        <HuiCollapsePanel
          title='custom-icon2'
          name='custom-icon2'
          expandText={(visible) => (visible ? 'open' : 'close')}
          expandIcon={(visible) =>
            visible ? (
              <HuiIcon name='003-right' />
            ) : (
              <HuiIcon name='001-close' />
            )
          }
        >
          <HuiText>
            Captain America, the embodiment of courage and virtue, is a Marvel
            superhero who fought in World War II. Enhanced with a super-soldier
            serum, Steve Rogers wields his iconic shield and leads the Avengers.
            His unwavering commitment to justice and his unwavering moral
            compass make him a true symbol of heroism.
          </HuiText>
        </HuiCollapsePanel>
      </GroupSection>
    </View>
  </View>
)

export default CollapsePanelDemo
