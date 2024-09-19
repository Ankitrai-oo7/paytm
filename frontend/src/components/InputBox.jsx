
export function InputBox({label,placeholder,onChange}){
        return <div>
        <div className=" text-sm font-medium text-left py-3">
        {label}
        </div>
         <input onChange={onChange} placeholder={placeholder} className="w-full border rounded px-1  py-1
          border-slate-200" />
        </div>
}