// /// <reference no-default-lib="true"/>
// import React from 'react';
// import { shallow } from 'enzyme';
// import useForm from './index';

// function validate(values: any) {
//   const errors: any = {};
//   if (!values.email) {
//     errors.email = 'Warrior! We must know your name for the battle field!';
//   }
//   if (!values.password) {
//     errors.password = 'You must provide this, for passage!';
//   }
//   return errors;
// }

// // function HookWrapper() {
// //   const { values, errors, handleSubmit, handleChange } = useForm(onSubmit, validate);
// //   function onSubmit(){}
// //   return <form onSubmit={handleSubmit}>
// //     <input id="email" value={values.email || ""} onChange={handleChange} />
// //     {errors.email && <p>{errors.email}</p>}
// //     <input id="password" value={values.password || ""} onChange={handleChange} />
// //     {errors.password && <p>{errors.password}</p>}
// //     <button id="submit" type="submit">SUBMIT</button>
// //   </form>;
// // }

// function HookWrapper(props) {
//   const hook = props.hook ? props.hook() : undefined;
//   // @ts-ignore
//   return <div hook={hook} />;
// }

// describe('Tesint Use Form Hook', () => {
//   function onSubmit() {}
//   let wrapper = shallow(<HookWrapper hook={() => useForm(onSubmit, validate)} />);
//   it('initializes the use form hook in empty state', () => {
//     // @ts-ignore
//     let { hook } = wrapper.find('div').props();
//     const { values, errors, handleSubmit, handleChange } = hook;
//     expect(values).toEqual({});
//     expect(errors).toEqual({});
//   });
//   it('handles field updates', () => {
//     // @ts-ignore
//     let { hook } = wrapper.find('div').props();
//     // @ts-ignore
//     let { values, errors, handleSubmit, handleChange } = hook;
//     handleChange({ persist: jest.fn(), target: { id:"email", value: 'nate@gmail.com' } });
//     handleChange({ persist: jest.fn(), target: { id:"password", value: '123456' } });
//     // @ts-ignore
//     ({ hook } = wrapper.find('div').props());
//     // @ts-ignore
//     let { values, errors, handleSubmit, handleChange } = hook;
//     expect(values.email).toEqual('nate@gmail.com');
//     expect(values.password).toEqual('123456');
//   });
// });
