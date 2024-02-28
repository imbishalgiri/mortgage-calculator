'use client';
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Label,
  Tooltip,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Bullet = ({ backgroundColor, size }: any) => {
  return (
    <div
      className='CirecleBullet'
      style={{
        backgroundColor,
        width: size,
        height: size,
      }}
    ></div>
  );
};

const CustomizedLegend = (props: any) => {
  const { payload } = props;
  return (
    <>
      {payload.map((entry: any, index: any) => (
        <div
          key={`item-${index}`}
          className='BulletLabel'
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Bullet backgroundColor={entry.payload.fill} size='10px' />
          <div className='BulletLabelText'>{entry.value}</div>
        </div>
      ))}
    </>
  );
};

const CustomLabel = ({
  viewBox,
  labelText,
  value,
}: {
  value: number;
  labelText: string;
  viewBox: any;
}) => {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text
        x={cx}
        y={cy}
        className='recharts-text recharts-label'
        textAnchor='middle'
        dominantBaseline='central'
        alignmentBaseline='middle'
        fontSize='15'
      >
        {labelText}
      </text>
      <text
        x={cx}
        y={cy + 20}
        className='recharts-text recharts-label'
        textAnchor='middle'
        dominantBaseline='central'
        alignmentBaseline='middle'
        fill='#0088FE'
        fontSize='20'
        fontWeight='600'
      >
        ${Math.floor(value).toLocaleString('en-US')}
      </text>
    </g>
  );
};

export default function AppPie({
  mortgage,
  data01,
}: {
  mortgage: number;
  data01: { name: string; value: number }[];
}) {
  if (!data01) {
    return (
      <div
        style={{
          textAlign: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        Sorry you have not entered enough data to show visualization.
      </div>
    );
  }
  return (
    <ResponsiveContainer
      width={400}
      height={400}
      style={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <PieChart>
        <Pie
          data={data01}
          dataKey='value'
          cx={200}
          cy={200}
          innerRadius={80}
          outerRadius={100}
        >
          {data01.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Label
            content={
              <CustomLabel labelText='Mortgage' value={mortgage} viewBox={{}} />
            }
            position='center'
          />
        </Pie>
        <Legend content={<CustomizedLegend />} />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
