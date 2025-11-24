import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderLayout from "../components/order/OrderLayout";
import QuantityCard from "../components/order/QuantityCard";

const RefillJugStepOne = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    {
      id: "purificada",
      name: "Garrafón Agua Purificada",
      quantity: 1,
      featured: true,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBTRVNohQGHFBIoOVWt09upHMGaDfTjggm9hSZDZPpoIbyFDFwj8Hwls4Bu4Jt0z-I0zlD6rGZuPgFLNAZX_Rp10k7zaOAypOsW0YOx_aesQnxkEq6DyYkUB5CqS1F8a0z5pWE-ypqbtAbNM4Np_GKvHyzEtrjSMe4ix1h8yb-_q3_VmnKyvOOesbq73drHVvURX_RHYCYf5ACdbYjuozn8Qyipi7Of1l4PSlDVfO-NTsy-yTMjkF1gUb1ftXcHZnI_9dpqii7PCB0",
    },
    {
      id: "alcalina",
      name: "Garrafón Agua Alcalina",
      quantity: 0,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCVAie7BW96pA3Uratok-bSvGNFyqMOvaD3APx6cd8xZ4gbAiKHwbj7OimlIFUfUY-yOlbED284bp8Em0poa_sRIiWRAMMIQsEtqf4IllyH8lgKTL07MSxMN2QsoOogm_La93aEuHIKTuWudeIdNnPnLswoM7XL8ZZU6pkQOe_KMsWu3YOE6-2AfmzMG29kIrMfwHqyL2qUq3yrN71jY4oTWAgIUeUS5R6Aze3mTjF_P7ACkzk9xSWGq7H0W1_VDZHpc5-icAGyIEo",
    },
    {
      id: "sales",
      name: "Garrafón con Sales",
      quantity: 0,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCmKKVAAtGmsQig5k97WcD6AyML42G7QreNcsx40TC9bMGtmTvom0uVtUWtu3TLN3hXPMUP-SSjDso_SIX26fDEkAAYUenF7GDxxNj8PJxV3vESgWsvuc1m1qEVijARm8W75QlaUrOlYmGNWPDVrDJG-YtUzMLbuPUXhb73RUe9yC9WahHJJYKaFksqDzGlBBb9lzp62cv85L1yIAGgdUrK24nXGQwy_NemDtjqSiIGOeyMROiLj0VRTcKMPPzFdCLJ7fNnkX3LB5Q",
    },
    {
      id: "mini",
      name: "Mini Garrafón 10L",
      quantity: 0,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCPxO8yyHL_taBt223sONBdpSbE5Vi5QmADdTFJBPSqLUS3j_kipF_63ooBdL3k742PmZy90D1C-XH2N-2D8fSYWZXX4ZdxGnjrEJQn5Aqryo04kzgdo7bWVNTyZNE2Qj9vGtSpgYw-uzff0cJGD2FEo6FyFxiAFfpPLSjLRKcN9_p5q6h2RyG02ieunUVHaN2ZSwvACX73X8I-8kFTDbWY_FGkU3ky5HY0ss8cZrrm4jNRzMfeMNoe200cOJvFotwdBxrqovHhc2Q",
    },
    {
      id: "premium",
      name: "Garrafón Premium",
      quantity: 0,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAJZgkmppkAPCdnjC_iE9fF46ysHE_0SRU8sTjFAljGWwODVVp_pyjSz6CIjEZaGhfwfjneINMAh44F7_rVW59wLUXmevMXtAaCdpnD0UY8CW5cKKbIH1frc4TWw4xr8jDKI5ilQdpZNPWoXIj_XZSNFwhFhMJ80ZeCf0nJtuFe58sFhXgMr2iksyLnuOu_FrEosFF-mgJoz7kJ2STQsSXydqF-F8txCaynxhT1rSjqT-612CqD-tcvKQnKVN-xluo9SI-5t04XcrM",
    },
  ]);

  const handleChangeQuantity = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(0, p.quantity + delta) } : p
      )
    );
  };

  const handleContinue = () => {
    const totalJugs = products.reduce((sum, p) => sum + p.quantity, 0);

    if (totalJugs === 0) {
      // Si quieres, aquí podrías mostrar un mensaje de error/toast
      console.log("Debes seleccionar al menos 1 garrafón");
      return;
    }

    console.log("Continuar al Paso 2 - total:", totalJugs, products);

    // Enviamos el total y también el detalle del paso 1 (por si luego lo quieres en el resumen)
    navigate("/pedidos/rellenar/asignar", {
      state: {
        maxJugs: totalJugs,
        fromStepOne: products,
      },
    });
  };

  return (
    <OrderLayout
      title="Paso 1: Seleccionar Garrafón"
      subtitle="Elige los productos y cantidades que necesitas."
      step={1}
      totalSteps={4}
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 p-6 mt-2">
        {products.map((product) => (
          <QuantityCard
            key={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            quantity={product.quantity}
            featured={product.featured}
            onIncrease={() => handleChangeQuantity(product.id, 1)}
            onDecrease={() => handleChangeQuantity(product.id, -1)}
          />
        ))}
      </div>

      {/* Footer dentro del layout */}
      <footer className="mt-auto px-6 py-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleContinue}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 flex-1 sm:flex-none sm:w-auto bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
          >
            <span className="truncate">Continuar al Paso 2</span>
          </button>
        </div>
      </footer>
    </OrderLayout>
  );
};

export default RefillJugStepOne;
