import React from 'react';
import { Svg, Path, G, Rect, Circle } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const NeuroFlowLogo = ({ width = 150, height = 150, color = '#EAEAF2' }: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 100 100">
    <Path d="M85,50 C85,20 65,5 50,20 C35,35 15,30 15,50 C15,80 35,95 50,80 C65,65 85,70 85,50 Z" stroke="#3B82F6" strokeWidth="5" fill="none" strokeLinecap="round"/>
    <Path d="M50,15 C20,15 5,35 20,50 C35,65 30,85 50,85 C80,85 95,65 80,50 C65,35 70,15 50,15 Z" stroke="#4A90E2" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.7"/>
    <G transform="translate(28, 28) scale(1.8)">
      <Path fill={color} d="M12,2A7,7,0,0,0,5,9c0,2.38,1.19,4.47,3,5.74V17a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V14.74c1.81-1.27,3-3.36,3-5.74A7,7,0,0,0,12,2Zm4,13.59V16H8v-1.41A5.002,5.002,0,0,1,7,9a5,5,0,0,1,10,0,5.002,5.002,0,0,1-2,4.59ZM12,5a3,3,0,0,0-3,3,1,1,0,0,1-2,0A5,5,0,0,1,12,3a1,1,0,0,1,0,2Z" />
      <Path fill={color} d="M9,20h6a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z" />
    </G>
  </Svg>
);

export const MenuIcon = ({ width = 24, height = 24, color = '#FFF' }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path d="M3 12H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M3 6H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M3 18H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const PlusIcon = ({ width = 24, height = 24, color = '#000' }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5V19M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
  
  export const EditIcon = ({ width = 24, height = 24, color = '#000' }: IconProps) => (
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
          <Path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <Path d="M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
  );
  
  export const TrashIcon = ({ width = 24, height = 24, color = '#000' }: IconProps) => (
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
          <Path d="M3 6H5H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <Path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
  );
  
  export const HomeIcon = ({ width = 24, height = 24, color = '#000' }: IconProps) => (
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
          <Path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <Path d="M9 22V12H15V22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
  );
  
  export const CalendarIcon = ({ width = 24, height = 24, color = '#000' }: IconProps) => (
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
          <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <Path d="M16 2V6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <Path d="M8 2V6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <Path d="M3 10H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
  );
  
  export const ProfileIcon = ({ width = 24, height = 24, color = '#000' }: IconProps) => (
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
          <Path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
  );