import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { FilterBar } from '../../lib/FilterBar';
import { FilterItem } from '../../lib/FilterItem';
import { FilterType } from '../../lib/FilterType';
import { Input } from '../../lib/Input';
import { PlacementType } from '../../lib/PlacementType';
import { Switch } from '../../lib/Switch';
import { TitleLevel } from '../../lib/TitleLevel';
import { VariantManagement } from '../../lib/VariantManagement';

const flavours = [];
for (let i = 1; i <= 9; i++) {
  flavours.push(i);
}
const variantItems = [{ label: 'Variant 1', key: '1' }, { label: 'Variant 2', key: '2' }];
const filterItems = [{ text: 'Text 1', key: '1' }, { text: 'Text 2', key: '2' }];

const renderVariants = () => {
  return (
    <VariantManagement
      style={{ width: '300px', height: 'auto' }}
      closeOnItemSelect={boolean('closeOnItemSelect', true)}
      initialSelectedKey={'2'}
      variantItems={variantItems}
      onSelect={(e) => {
        console.log(e.getParameter('selectedItem').key);
      }}
      placement={select('Placement', PlacementType, PlacementType.Bottom)}
      level={select('level', TitleLevel, TitleLevel.H6)}
    />
  );
};

const renderSearch = () => {
  return <Input placeholder={'Search'} />;
};

function renderStory() {
  return (
    <FilterBar renderSearch={renderSearch} renderVariants={renderVariants}>
      <FilterItem
        onChange={(e) => alert(e.getParameter('selectedItem').key)}
        filterItems={filterItems}
        label="Classification"
        key="classification"
        type={FilterType.Select}
      />
      <FilterItem
        key={'filter2'}
        type={FilterType.Custom}
        label={'Custom Filter 1'}
        changeEventName={'onClick'}
        valueParamName={'state'}
      >
        <Switch />
      </FilterItem>
      {/*<FilterItem*/}
      {/*key={'filter2'}*/}
      {/*type={FilterType.Custom}*/}
      {/*label={'Custom Filter 2'}*/}
      {/*changeEventName={'onSelect'}*/}
      {/*valueParamName={'state'}*/}
      {/*>*/}
      {/*<RadioButton text={"Custom Radio Button filter"} onSelect={(e) => {*/}
      {/*alert(e.parameters.selectedItem);*/}
      {/*}}/>*/}
      {/*</FilterItem>*/}
    </FilterBar>
  );
}

storiesOf('Components | FilterBar', module).add('Default', renderStory);
