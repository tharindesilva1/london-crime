import { DataTypes, Sequelize, Model, Op, WhereOptions } from "sequelize";
import { CrimeType } from "../typings/crime";

const sequelizeInstance = new Sequelize(
  "crime",
  process.env.DB_USERNAME ?? "",
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

const config = {
  tableName: "crimes",
  sequelize: sequelizeInstance,
};

// interface IRec {
//   xMin: number;
//   xMax: number;
//   yMin: number;
//   yMax: number;
// }

interface CrimeDbResponse {
  id: string;
  location: { coordinates: number[] };
  type: CrimeType;
}

class Crime extends Model {
  id!: string;
  date!: Date;
  location!: { coordinates: number[] };
  type!: CrimeType;
  outcome!: string;
  police!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static findCrimes(
    startDate: Date,
    endDate: Date,
    crimeType?: string
  ): Promise<CrimeDbResponse[]> {
    const whereConditions: WhereOptions<any> = {
      date: {
        [Op.between]: [startDate, endDate],
      },
    };

    if (crimeType !== CrimeType.ALL) {
      whereConditions.type = {
        [Op.eq]: crimeType,
      };
    }

    return this.findAll({
      attributes: ["id", "location", "type"],
      where: whereConditions,
    }).then((results) => {
      return results.map((result: any) => result.get({ plain: true }));
    });
  }

  static getCrimes(ids: string[]) {
    return this.findAll({
      where: {
        id: {
          [Op.any]: ids,
        },
      },
    });
  }
}

Crime.init(
  {
    id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.GEOGRAPHY,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    outcome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    police: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  config
);

export default Crime;
