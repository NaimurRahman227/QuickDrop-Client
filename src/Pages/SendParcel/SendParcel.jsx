import { useForm } from "react-hook-form";
import District from "/src/assets/District.json";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

const SendParcel = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      type: "document",
      senderName: user?.name || "",
    },
  });

  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const regions = District.map((d) => d.district);

  const getCenters = (region) => {
    const found = District.find((d) => d.district === region);
    return found ? found.covered_area : [];
  };

  // COST LOGIC
  const calculateCost = (data) => {
    let base = data.type === "document" ? 60 : 120;
    let weightCost = 0;

    if (data.type === "non-document") {
      const w = Number(data.weight || 0);
      if (w > 3) weightCost = (w - 3) * 20;
    }

    let centerCost = 30;

    return { base, weightCost, centerCost, total: base + weightCost + centerCost };
  };

  // PROFESSIONAL PDF
  const generateParcelPDF = (data, costObj, trackingId) => {
    const doc = new jsPDF();

    // HEADER
    doc.setFillColor(33, 150, 243);
    doc.rect(0, 0, 210, 25, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("QuickDrop Parcel Invoice", 14, 16);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text(`Tracking ID: ${trackingId}`, 14, 35);
    doc.text(`Date: ${new Date().toLocaleString()}`, 140, 35);

    // PARCEL TABLE
    autoTable(doc, {
      startY: 45,
      head: [["Parcel Info", "Value"]],
      body: [
        ["Type", data.type],
        ["Title", data.title],
        ["Weight", data.weight ? data.weight + " kg" : "N/A"],
      ],
    });

    // SENDER TABLE
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      head: [["Sender Info", "Value"]],
      body: [
        ["Name", data.senderName],
        ["Contact", data.senderContact],
        ["Region", data.senderRegion],
        ["Center", data.senderCenter],
        ["Address", data.senderAddress],
      ],
    });

    // RECEIVER TABLE
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      head: [["Receiver Info", "Value"]],
      body: [
        ["Name", data.receiverName],
        ["Contact", data.receiverContact],
        ["Region", data.receiverRegion],
        ["Center", data.receiverCenter],
        ["Address", data.receiverAddress],
      ],
    });

    // COST BREAKDOWN
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 8,
      head: [["Delivery Cost", "Amount"]],
      body: [
        ["Base Cost", `Tk ${costObj.base}`],
        ["Weight Cost", `Tk ${costObj.weightCost}`],
        ["Service Fee", `Tk ${costObj.centerCost}`],
        ["TOTAL", `Tk ${costObj.total}`],
      ],
    });

    // FOOTER
    doc.setFontSize(10);
    doc.text(
      "Thank you for choosing QuickDrop. This is a system generated invoice.",
      14,
      285
    );

    doc.save(`parcel-${trackingId}.pdf`);
  };

  const onSubmit = async (data) => {
    const costObj = calculateCost(data);
    const user = JSON.parse(localStorage.getItem("user"));

    const orderPayload = {
      ...data,
      cost: costObj.total,
      userId: user?._id,
      userName: user?.name,
      userEmail: user?.email,
    };

    Swal.fire({
      title: "Delivery Cost",
      html: `
      Base Cost: ৳ ${costObj.base} <br/>
      Weight Cost: ৳ ${costObj.weightCost} <br/>
      Service Fee: ৳ ${costObj.centerCost} <br/><br/>
      <b>Total: ৳ ${costObj.total}</b>
    `,
      showCancelButton: true,
      confirmButtonText: "Proceed",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // 🔥 SEND TO BACKEND
          const token = localStorage.getItem("token");

          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/orders`,
            orderPayload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const backendTrackingId = response.data.trackingId;

          generateParcelPDF(data, costObj, backendTrackingId);

          Swal.fire({
            icon: "success",
            title: "Parcel Confirmed!",
            text: "Order Saved & PDF Downloaded",
          });

        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Order Failed",
            text: error.response?.data?.message || "Something went wrong",
          });
        }
      }
    });
  };


  const inputStyle =
    "input input-bordered w-full focus:outline-none focus:ring-0 focus:border-accent";
  const selectStyle =
    "select select-bordered w-full focus:outline-none focus:ring-0 focus:border-accent";

  return (
    <div className="max-w-7xl mx-auto p-6 bg-base-200 rounded-xl shadow">
      <h1 className="text-3xl font-bold">Book Parcel</h1>
      <p className="text-gray-500 mb-6">
        Door to Door Delivery – Provide pickup & delivery details
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">

        {/* PARCEL INFO */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold text-xl mb-3">Parcel Info</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <select {...register("type")} className={selectStyle}>
              <option value="document">Document</option>
              <option value="non-document">Non Document</option>
            </select>

            <input placeholder="Parcel Title" className={inputStyle}
              {...register("title", { required: true })} />

            {parcelType === "non-document" && (
              <input type="number" placeholder="Weight (kg)"
                className={inputStyle} {...register("weight")} />
            )}
          </div>
        </div>

        {/* SENDER */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold text-xl mb-3">Sender Info</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Sender Name"
              className={inputStyle}
              {...register("senderName", { required: true })}
            />
            <input placeholder="Contact" className={inputStyle}
              {...register("senderContact", { required: true })} />

            <select {...register("senderRegion")} className={selectStyle}>
              <option value="">Select Region</option>
              {regions.map((r, i) => <option key={i}>{r}</option>)}
            </select>

            <select {...register("senderCenter")} className={selectStyle}>
              <option value="">Service Center</option>
              {getCenters(senderRegion).map((c, i) => <option key={i}>{c}</option>)}
            </select>

            <input placeholder="Address" className={`${inputStyle} col-span-2`}
              {...register("senderAddress")} />
          </div>
        </div>

        {/* RECEIVER */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold text-xl mb-3">Receiver Info</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input placeholder="Name" className={inputStyle}
              {...register("receiverName")} />
            <input placeholder="Contact" className={inputStyle}
              {...register("receiverContact")} />

            <select {...register("receiverRegion")} className={selectStyle}>
              <option value="">Select Region</option>
              {regions.map((r, i) => <option key={i}>{r}</option>)}
            </select>

            <select {...register("receiverCenter")} className={selectStyle}>
              <option value="">Service Center</option>
              {getCenters(receiverRegion).map((c, i) => <option key={i}>{c}</option>)}
            </select>

            <input placeholder="Address" className={`${inputStyle} col-span-2`}
              {...register("receiverAddress")} />
          </div>
        </div>

        <button className="btn btn-primary w-full md:w-1/3 mx-auto mb-15">
          Calculate Cost
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
