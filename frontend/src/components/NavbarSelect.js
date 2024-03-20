import * as Select from "@radix-ui/react-select";
import React from "react";

const NavbarSelect = ({type}) => {
  const [selectedItemIdx, setSelectedItemIdx] = React.useState(0);

  const locationItems = [
    { label: "Kuala Lumpur"},
    { label: "Penang"},
    { label: "Johor Bahru"},
    { label: "Kuching"},
    { label: "Kota Kinabalu"},
  ];

  const profileItems = [
    { label: "Edit Profile" },
    { label: "Settings" },
    { label: "Logout" },
  ];

  const items = type === "location" ? locationItems : profileItems;

  return (
    <Select.Root onValueChange={setSelectedItemIdx}>
      <div className="w-72 max-w-full">
        <Select.Trigger className="w-full inline-flex items-center justify-between px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2">
          <Select.Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>
          </Select.Icon>
          <Select.Value placeholder="Select a status">
            <div className="flex items-center gap-x-3">
              Status{" "}
              <span
                className={`w-2 h-2 rounded-full ${items[selectedItemIdx].statusBg}`}
              ></span>
              <span
                className={`text-sm ${items[selectedItemIdx].statusColor}`}
              >
                {items[selectedItemIdx].label}
              </span>
            </div>
          </Select.Value>
          <Select.Icon className="text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            avoidCollisions={false}
            className="w-[var(--radix-select-trigger-width)] max-h-64 mt-3 overflow-y-auto bg-white border rounded-lg shadow-sm text-sm"
          >
            <Select.Viewport className="">
              {items.map((item, idx) => (
                <SelectItem key={idx} value={idx}>
                  <span
                    className={`w-2 h-2 rounded-full ${item.statusBg}`}
                  ></span>
                  {item.label}
                </SelectItem>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </div>
    </Select.Root>
  );
};

const SelectItem = React.forwardRef(
    ({ children, className, type, ...props }, forwardedRef) => {
      if (type === "location") {
        return (
          <Select.Item
            className="flex items-center justify-between px-3 cursor-default py-2 duration-150 text-gray-600 data-[state=checked]:text-indigo-600 data-[state=checked]:bg-indigo-50 data-[highlighted]:text-indigo-600 data-[highlighted]:bg-indigo-50 data-[highlighted]:hover:text-indigo-600 data-[highlighted]:hover:bg-indigo-50 outline-none"
            {...props}
            ref={forwardedRef}
          >
            <Select.ItemText>
              <div className="pr-4 line-clamp-1 flex items-center gap-2">
                {children}
              </div>
            </Select.ItemText>
            <div className="w-6">
              <Select.ItemIndicator>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>{" "}
              </Select.ItemIndicator>
            </div>
          </Select.Item>
        );
      } else if (type === "profile") {
        return (
          <Select.Item
            className="flex items-center justify-between px-3 cursor-default py-2 duration-150 text-gray-600 data-[state=checked]:text-indigo-600 data-[state=checked]:bg-indigo-50 data-[highlighted]:text-indigo-600 data-[highlighted]:bg-indigo-50 data-[highlighted]:hover:text-indigo-600 data-[highlighted]:hover:bg-indigo-50 outline-none"
            {...props}
            ref={forwardedRef}
          >
            <Select.ItemText>
              <div className="pr-4 line-clamp-1 flex items-center gap-2">
                {children}
              </div>
            </Select.ItemText>
            <div className="w-6">
              <Select.ItemIndicator>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>{" "}
              </Select.ItemIndicator>
            </div>
          </Select.Item>
        );
      } else {
        return null;
      }
    }
  );  

export default NavbarSelect;
