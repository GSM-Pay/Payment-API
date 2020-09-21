import { transaction, user } from '../models'

const resolver = {
    Query: {

    },
    Mutation: {
        refund: async(_:any, { tid }: any) => {
            const destroyId = await transaction.findOne({ where: {
                tid:tid
            }
                
            })
            await transaction.destroy({ where: {
                tid : tid
            }
            })

            return destroyId
        }

    }
};

export {
    resolver,
};